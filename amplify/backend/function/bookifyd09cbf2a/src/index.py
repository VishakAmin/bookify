import json
import boto3


# s3 = boto3.resource('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table("UserBooks-hckcc2a5pneojbzpxsmsbrgc3i-bookify")

def handler(event, context):
    response = table.get_item(
        Key={
            'id' : "e023ce1d-1c3d-4870-aced-7a96fbdfcc08"
        }
    )
    print(response)

    return {
        'statusCode' : 200,
        "body": response
    }


#   print('received event:')
#   print(event)
  
#   return {
#       'statusCode': 200,
#       'headers': {
#           'Access-Control-Allow-Headers': '*',
#           'Access-Control-Allow-Origin': '*',
#           'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
#       },
#       'body': json.dumps('Hello from your new Amplify Python lambda!')
#   }
