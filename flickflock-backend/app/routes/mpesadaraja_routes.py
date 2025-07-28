from flask import Flask, request
from flask_restful import Resource
import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime
import json
import base64


# APi setup
class MpesaDarajaResource(Resource):

    # Env setup
    base_url = "https://sandbox.safaricom.co.ke" 
    consumer_secret = "Kw3nr47GNKF4MFIJQZyAQWv07jq3D8ktml8AeWPxu8S82iY3QlirUkRjvBA0JlCb"
    consumer_key = "2XI7s7kuZyz5GF2pOBROGUiAh2oGHYwQs1r5M6XvUnNuaMc7" 
    callback_url = "https://58c78fb90caf.ngrok-free.app/api/mpesa/callback"  #check on this!!!!!

    # STK push credentials
    business_shortcode = "174379"
    passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"


    # Access tokens
    @classmethod
    def _access_token(cls):
        token_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        response = requests.get(token_url, auth=HTTPBasicAuth(cls.consumer_key, cls.consumer_secret))
        data = response.json()
        print("Mpesa token response:", data)  # Add this line
        return data['access_token']


    # STK push  
    def post(self):
        data = request.get_json()

        # Inputs data
        phoneNumber = data.get("phoneNumber")
        amount = data.get("amount")

        if not all([phoneNumber,amount]):
            return {f"error": "Missing phone number or amount"}, 400
        
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        raw_password = self.business_shortcode + self.passkey + timestamp
        encoded_password = base64.b64encode(raw_password.encode()).decode()
        access_token = self._access_token()
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        # API endpoint for STK push
        stk_url = f"{self.base_url}/mpesa/stkpush/v1/processrequest"


        payload = {
            "BusinessShortCode": self.business_shortcode,
            "Password": encoded_password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",  
            "Amount": amount,
            "PartyA": phoneNumber,
            "PartyB": self.business_shortcode,
            "PhoneNumber": phoneNumber,
            "CallBackURL": self.callback_url,
            "AccountReference": "FlickFlock",
            "TransactionDesc": "Membership"
        }

        try :
            res = requests.post(stk_url, json = payload, headers = headers)
            return res.json()
        except Exception as e:
            return {"error": str(e)}, 500 