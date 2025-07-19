from flask import Flask, request
from flask_restful import Resource
import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime
import json
import base64


# APi setup
class MembershipResource(Resource):

    # Env setup
    base_url = "" 
    consumer_secret = ""
    consumer_key = "" 

    # STK push credentials
    business_shortcode = ""
    passkey = ""


    # Access tokens
    @classmethod
    def _access_token(cls):
         token_url = "" 
         response = requests.get(token_url, auth=HTTPBasicAuth(cls.consumer_key, cls.consumer_secret))
         data = response.json()
         return data['access_token']


    # STK push  
    def post(self):
        data = request.get_json()

        # Inputs data
        phoneNumber = data.get("phoneNumber")
        amount = data.get("amount")s

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
        stk_url = ""


        payload = {
            "BusinessShortCode": self.business_shortcode,
            "Password": encoded_password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",  
            "Amount": amount,
            "PartyA": phoneNumber,
            "PartyB": self.business_shortcode,
            "PhoneNumber": phoneNumber,
            "CallBackURL": self.base_url,
            "AccountReference": "TestPay",
            "TransactionDesc": "Test STK Payment"
        }

        try :
            res = requests.post(stk_url, json = payload, headers = headers)
            return res.json()
        except Exception as e:
            return {"error": str(e)}, 500 