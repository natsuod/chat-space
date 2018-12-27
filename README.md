# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :groups, through: members
- has_many :messages
- has_many :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, throught: members
- has_many :messages
- has_many :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foregn_key: true|
|user_key|integer|null: false, foregn_key: true|

### Association
- belongs_to :user
- belongs_to :group
















