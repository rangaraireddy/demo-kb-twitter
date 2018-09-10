import json

import tweepy
from config.props import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET


# Randomly "POST" anything to YOUR twitter account once you have your consumer keys and tokens


def tweet_to_main_account(data):
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth)
    valid_json = json.loads(json.dumps(data)) if data else None
    status = valid_json["value"]

    try:
        api.update_status(status)
    except tweepy.TweepError as error:
        if error.api_code == 187:
            print('message sent once')
        else:
            raise Exception('something went wrong')

    return 'DONE TWEETING!!!'
