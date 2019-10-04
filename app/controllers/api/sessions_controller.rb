class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
        )
        if @user
            login(@user)
            render '/api/users/show'
        else
            render json: ['Unable to log in with provided credentials'], status: 422
        end
    end


    def destroy
        if current_user
            logout
            render json: {}
        else
            render json: ['not currently logged in']
        end
    end

end