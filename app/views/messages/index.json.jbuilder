json.array! @new_messages do |message|
  json.name @message.user.name
  json.content @message.content
  json.image @message.image
  json.group_id @message.group_id
  json.user_id @message.user_id
  json.time @message.created_at.strftime('%Y/%m/%d %H:%M')
end
