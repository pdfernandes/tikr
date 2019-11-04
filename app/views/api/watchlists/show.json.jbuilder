json.set! @company.id do 
    json.extract! @company, :id, :name, :ticker
end 