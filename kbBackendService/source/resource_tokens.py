import string
import json

from requests_oauthlib import OAuth1Session
from config.props import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET
from account_tweet import tweet_to_main_account


# TO GET ACCESS TOKENS FOR NEW USER

def get_resource_tokens():
    # create an object of OAuth1Session
    request_token = OAuth1Session(client_key=CONSUMER_KEY, client_secret=CONSUMER_SECRET)
    # twitter endpoint to get request token
    url = 'https://api.twitter.com/oauth/request_token'

    # get request_token_key, request_token_secret and other details
    data = request_token.get(url)

    # split the string to get relevant data
    data_token = string.split(data.text, '&')
    ro_key = string.split(data_token[0], '=')
    ro_secret = string.split(data_token[1], '=')

    resource_owner_key = ro_key[1]
    resource_owner_secret = ro_secret[1]
    # now we have the request_token and request_secret keys
    resource = [resource_owner_key, resource_owner_secret]

    return json.dumps(resource)


# def fetch_access_tokens(oauth_verifier, resource_owner_key, resource_owner_secret):
def fetch_access_tokens(query_params):
    oauth_token = OAuth1Session(client_key=CONSUMER_KEY,
                                client_secret=CONSUMER_SECRET,
                                resource_owner_key=query_params['roKey'],
                                resource_owner_secret=query_params['roSecret'])
    url = 'https://api.twitter.com/oauth/access_token'
    data = {"oauth_verifier": query_params['verifier']}

    access_token_data = oauth_token.post(url, data=data)
    access_token_list = string.split(access_token_data.text, '&')
    return verify_credentials_and_get_data(access_token_list)


# Now get all the required information about the user (username, email, tweets, likes, re-tweets, phone-no etc.)
def verify_credentials_and_get_data(token_list):
    oauth_token = string.split(token_list[0], '=')
    oauth_token_secret = string.split(token_list[1], '=')
    oauth_user = OAuth1Session(client_key=CONSUMER_KEY,
                               client_secret=CONSUMER_SECRET,
                               resource_owner_key=oauth_token[1],
                               resource_owner_secret=oauth_token_secret[1])
    url_user = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    params = {"include_email": 'true'}
    user_data = oauth_user.get(url_user, params=params)
    user_name = json.loads(user_data.text).get("name")
    post_message = {
        'message': user_name + ' just bought Kidbox. Visit www.kidbox.com for yours.'
    }
    tokens = {
        'access_token': oauth_token[1],
        'access_secret': oauth_token_secret[1]
    }
    tweet_to_main_account(post_message, tokens)
    return user_data.text

