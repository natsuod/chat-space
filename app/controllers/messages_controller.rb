class MessagesController < ApplicationController

def index

end

def create

end

def set_group
  @group = Group.find(params[:group_id])
end

end
