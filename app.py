from flask import Flask, render_template, request, jsonify
import smtplib

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/process', methods=['POST'])
def process_string():
    try:
        data = request.get_json()
        print(f"Data received: {data}")  # Debugging input

        if not data or 'inputString' not in data:
            return jsonify({"error": "Invalid input"}), 400

        TO_EMAIL = data['inputString']
        HOST = "smtp.gmail.com"
        PORT = 587
        FROM_EMAIL = "panicbuttonucc@gmail.com"
        FROM_APPKEY = "hzkuawacgwtnlcvc"

        MESSAGE = """Subject:Panic Button Test Email
        This is a test email for the Panic Button web app
        """
        
        # Set up the SMTP server and send the email
        server = smtplib.SMTP(HOST, PORT)
        server.set_debuglevel(1)  # Enable verbose output for SMTP (helpful for debugging)
        server.ehlo()
        server.starttls()
        server.login(FROM_EMAIL, FROM_APPKEY)
        server.sendmail(FROM_EMAIL, TO_EMAIL, MESSAGE)
        server.quit()

        return jsonify({"message": f"Email sent successfully to {TO_EMAIL}"}), 200

    except smtplib.SMTPException as e:
        print(f"SMTP error: {str(e)}")  # Log error for debugging
        return jsonify({"error": f"SMTP error occurred: {str(e)}"}), 500

    except Exception as e:
        print(f"General error: {str(e)}")  # Log error for debugging
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
