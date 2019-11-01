@watched_companies.each do |company|
    json.set! company.id do
        json.extract! company, :id, :user_id, :company_id
    end
end