@watched_companies.each do |company|
    json.set! entry.id do
        json.extract! entry, :id, :user_id, :company_id
    end
end