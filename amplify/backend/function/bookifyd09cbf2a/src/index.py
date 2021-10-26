import json
import boto3
import uuid

# s3 = boto3.resource('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table("UserBooks-hckcc2a5pneojbzpxsmsbrgc3i-bookify")

def handler(event, context):
    
    print("PARMETER",event["arguments"]["input"]["userBooksUserId"])
    response = table.put_item(
        Item={
            'id':str(uuid.uuid4()), 
            'userBooksUserId' : event["arguments"]["input"]["userBooksUserId"],
            'userBooksBookId' : event["arguments"]["input"]["userBooksBookId"],
            
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
