#!/usr/bin/env python

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from flask import Flask
from flask import request
from flask import redirect
import requests as req
import json

app = Flask(__name__)
app.debug = True

callbakUrl = 'http://localhost:5000/login'
appId = 'dingoasz6qlmib3eadk3ue'
appSecret = '_ZleHRjE6UVKomoPTXGXVHZGYflq75VNReGiCJ-rB_0_TLlWoRmvqhKiiHhPdsVR'

baseUrl = 'https://oapi.dingtalk.com/sns'

get_access_token_url = '%s/gettoken?appid=%s&appsecret=%s'
get_persistent_code = '%s/get_persistent_code?access_token=%s'
get_sns_token = '%s/get_sns_token?access_token=%s'
get_user_info = '%s/getuserinfo?sns_token=%s'

@app.route('/index')
def hello_world():
    qrUrl = 'https://oapi.dingtalk.com/connect/qrconnect?appid=%s&response_type=code&scope=snsapi_login&redirect_uri=%s' % (appId, callbakUrl)
    return redirect(qrUrl)

@app.route('/login')
def login():
    tmp_auth_code_map = {'tmp_auth_code': request.args.get('code')}

    res = req.get(get_access_token_url % (baseUrl, appId, appSecret))
    access_token = json.loads(res.content)['access_token']

    res = req.post(get_persistent_code % (baseUrl, access_token), json = tmp_auth_code_map)
    persistent_map = json.loads(res.content)

    res = req.post(get_sns_token % (baseUrl, access_token), json = persistent_map)
    sns_token = json.loads(res.content)['sns_token']

    res = req.get(get_user_info % (baseUrl, sns_token))
    user_info = json.loads(res.content)['user_info']
    
    return str(user_info)

if __name__ == '__main__':
    app.run()
