@transactions.each do |transaction|
    json.set! transaction.id do
        json.extract! transaction, :order_type, :quantity, :company_id, :user_id, :price
    end
end