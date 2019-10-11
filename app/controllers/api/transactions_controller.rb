class Api::TransactionsController < ApplicationController
    def index 
        @transactions = current_user.transactions
        render :index
    end


    def show 
    end

    def create 
        @transaction = Transaction.new(transaction_params)
        debugger
        if @transaction.save
            if @transaction.order_type
                debugger
                remaining_funds = current_user.funds - @transaction.price
            else
                remaining_funds = current_user.funds + @transaction.price
            end
            
            current_user.update_attributes(:funds => remaining_funds)
            render "/api/transactions/show"
        else
            render json: ["Invalid transaction"], status: 406
        end
    end


    private 
    def transaction_params
        params.require(:transaction).permit(:order_type, :quantity,:company_id, :user_id, :price)
    end
end