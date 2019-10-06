# json.extract! user, :id, :fname, :username, :funds, user.transactions

# json.transactions user.transaction_ids

json.id user.id
json.fname user.fname
json.username user.username
json.funds user.funds
json.transactions user.transaction_ids
json.companies user.company_ids.uniq