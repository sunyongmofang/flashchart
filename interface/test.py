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
    file_path = '/Users/sunyong/Public/worker/docker/prest/tmp/sunyong/test.read.sql'
    data = json.loads([i for i in request.form][0])
    sql = data['sql']
    with open(file_path, 'w') as f:
        f.write(str(sql))
    return 'test'

@app.route('/oauth')
def oauth():
    tmp_auth_code_map = {'tmp_auth_code': request.args.get('code')}

    res = req.get(get_access_token_url % (baseUrl, appId, appSecret))
    access_token = json.loads(res.content)['access_token']

    res = req.post(get_persistent_code % (baseUrl, access_token), json = tmp_auth_code_map)
    persistent_map = json.loads(res.content)

    res = req.post(get_sns_token % (baseUrl, access_token), json = persistent_map)
    sns_token = json.loads(res.content)['sns_token']

    res = req.get(get_user_info % (baseUrl, sns_token))
    user_info = json.loads(res.content)['user_info']
    
    return jsonify(user_info)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
