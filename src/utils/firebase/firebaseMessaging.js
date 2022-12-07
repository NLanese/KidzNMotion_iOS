https://fcm.googleapis.com//v1/projects/<YOUR-PROJECT-ID>/messages:send
Content-Type: application/json
Authorization: bearer <YOUR-ACCESS-TOKEN>

{
  "message": {
    "token": "eEz-Q2sG8nQ:APA91bHJQRT0JJ...",
    "notification": {
      "title": "Background Message Title",
      "body": "Background message body"
    },
    "webpush": {
      "fcm_options": {
        "link": "https://dummypage.com"
      }
    }
  }
}