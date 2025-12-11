import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправляет email с данными о подтверждении присутствия гостя на свадьбе
    Args: event - HTTP запрос с данными формы в body
          context - контекст выполнения функции
    Returns: HTTP ответ с результатом отправки
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port_str = os.environ.get('SMTP_PORT', '587')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    wedding_email = os.environ.get('WEDDING_EMAIL')
    
    if not all([smtp_host, smtp_user, smtp_password, wedding_email]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email configuration is missing'}),
            'isBase64Encoded': False
        }
    
    try:
        smtp_port = int(smtp_port_str)
    except ValueError:
        smtp_port = 587
    
    name = body_data.get('name', 'Не указано')
    message = body_data.get('message', 'Нет сообщения')
    will_attend = 'Да' if body_data.get('willAttend', True) else 'Нет'
    transfer = body_data.get('transfer', 'Не указано')
    food_preference = body_data.get('foodPreference', 'Нет')
    drinks = ', '.join(body_data.get('drinks', [])) if body_data.get('drinks') else 'Не указано'
    has_kids = 'Да' if body_data.get('hasKids', False) else 'Нет'
    
    email_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #FF69B4;">Новое подтверждение присутствия на свадьбе! 💕</h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Информация о госте:</h3>
            
            <p><strong>Имя:</strong> {name}</p>
            <p><strong>Придёт на свадьбу:</strong> {will_attend}</p>
            <p><strong>Нужен трансфер:</strong> {transfer}</p>
            <p><strong>Предпочтения по еде:</strong> {food_preference}</p>
            <p><strong>Предпочтения по напиткам:</strong> {drinks}</p>
            <p><strong>Будет с ребёнком:</strong> {has_kids}</p>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-left: 4px solid #FF69B4;">
                <strong>Сообщение для молодожёнов:</strong>
                <p style="margin: 10px 0 0 0; font-style: italic;">{message if message != 'Нет сообщения' else 'Гость не оставил сообщения'}</p>
            </div>
        </div>
        
        <p style="color: #888; font-size: 12px; margin-top: 30px;">
            Это автоматическое уведомление с сайта приглашения на свадьбу
        </p>
    </body>
    </html>
    """
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Подтверждение от {name} - Свадьба Данил и Алена'
    msg['From'] = smtp_user
    msg['To'] = wedding_email
    
    msg.attach(MIMEText(email_body, 'html', 'utf-8'))
    
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to send email: {str(e)}'}),
            'isBase64Encoded': False
        }