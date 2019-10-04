class Api::TransactionsController < ApplicationController
    def index 
        @transactions = current_user.transactions
        render :index
    end


    def show 
    end
end