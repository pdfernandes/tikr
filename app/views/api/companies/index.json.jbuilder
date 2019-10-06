@companies.each do |company|
    json.set! company.id do
        json.extract! company, :name, :ticker
    end
end