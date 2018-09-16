#!/usr/bin/env python

from flask import Flask
from flask import jsonify
from flask import request
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

@app.route('/test', methods=['POST'])
def test():
    req_name = 'test'
    file_path = '/Users/sunyong/Public/worker/docker/prest/tmp/sunyong/%s.read.sql' % (req_name)
    data = json.loads(request.get_data())
    sql = data['sql']
    with open(file_path, 'w') as f:
        f.write(sql)
    return req_name

@app.route('/oauth')
def oauth():
    tmp_auth_code_map = {'tmp_auth_code': request.args.get('code')}

    res = req.get(get_access_token_url % (baseUrl, appId, appSecret))
    access_token = res.json['access_token']

    res = req.post(get_persistent_code % (baseUrl, access_token), json = tmp_auth_code_map)
    persistent_map = res.json

    res = req.post(get_sns_token % (baseUrl, access_token), json = persistent_map)
    sns_token = res.json['sns_token']

    res = req.get(get_user_info % (baseUrl, sns_token))
    user_info = res.json['user_info']
    
    return jsonify(user_info)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
