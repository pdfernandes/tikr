# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Company.destroy_all
Transaction.destroy_all
Watchlist.destroy_all

# require 'csv'
# csv_text = File.read(Rails.root.join('lib', 'seeds', 'companies.csv'))
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   c = Company.new
#   c.ticker = row["TICKER"]
#   c.name = row["NAME"]
#   c.save
# end
require 'csv'
csv_text = File.read(Rails.root.join('lib', 'seeds', 'nasdaq.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = Company.new
  c.ticker = row["Symbol"]
  c.name = row["Company Name"]
  c.save
end

csv_text = File.read(Rails.root.join('lib', 'seeds', 'nyse.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = Company.new
  c.ticker = row["ACT Symbol"]
  c.name = row["Company Name"]
  c.save
end





demoUser = User.create!(username:"DemoUser", email:'demoUser@tikr.app', fname:'Demo', lname:'User', funds:100000, password: "password123")

demoCompany = Company.find_by(:ticker => "AAPL")
demoCompany2 = Company.find_by(:ticker => "AXP")
demoCompany3 = Company.find_by(:ticker => "BA")
demoCompany4 = Company.find_by(:ticker => "CAT")
demoCompany5 = Company.find_by(:ticker => "CSCO")

demoTransaction = Transaction.create!(order_type: true, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '2010-01-06', price: 50)
demoTransaction = Transaction.create!(order_type: true, quantity: 20, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '2010-01-06', price: 100 )
demoTransaction = Transaction.create!(order_type: true, quantity: 30, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '2010-01-06', price: 150 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '2010-03-06', price: 100 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '2010-03-08', price: 22 )
demoTransaction = Transaction.create!(order_type: true, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '2010-03-08', price: 20 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '2010-03-08', price: 50 )
demoTransaction = Transaction.create!(order_type: true, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '2010-03-08',price: 50 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '2012-03-07', price: 54 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '2016-03-23', price: 50 )
demoTransaction = Transaction.create!(order_type: true, quantity: 10, company_id: demoCompany2.id, user_id: demoUser.id,transaction_time: '2018-11-07', price: 36 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '2018-11-07', price: 36 )
demoTransaction = Transaction.create!(order_type: true, quantity: 10, company_id: demoCompany3.id, user_id: demoUser.id,transaction_time: '2019-10-03', price: 150 )
demoTransaction = Transaction.create!(order_type: true, quantity: 20, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '2019-10-03', price: 25 )


demoWatchlistItem = Watchlist.create!(user_id: demoUser.id, company_id: demoCompany2.id)
demoWatchlistItem = Watchlist.create!(user_id: demoUser.id, company_id: demoCompany3.id)
demoWatchlistItem = Watchlist.create!(user_id: demoUser.id, company_id: demoCompany4.id)
demoWatchlistItem = Watchlist.create!(user_id: demoUser.id, company_id: demoCompany5.id)