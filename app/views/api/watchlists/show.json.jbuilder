json.set! @watchlist.company_id do |item|
    json.extract! item, :id, :user_id, :company_id
end