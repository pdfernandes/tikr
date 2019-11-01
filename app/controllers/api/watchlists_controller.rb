class Api::WatchlistsController < ApplicationController


def index
    @companies = current_user.watched_companies
    # debuggthis,er
    render '/api/companies/index'
end 


def create
    debugger
    @watchlist_item = Watchlist.new(watchlist_params)
    debugger
    if @watchlist_item.save 
        debugger
        render ["success"], status: 200
    else
        render ["not a valid watchlist"], status: 406    
    end 
end

def destroy
    debugger
    @watchlist_item = Watchlist.find(params[:id])
    @watchlist_item.destroy
    debugger
    render json: ["successful"], status: 200
end


private 

def watchlist_params
    params.require(:watchlist).permit(:user_id, :company_id)
end

end
