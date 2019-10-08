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

require 'csv'
csv_text = File.read(Rails.root.join('lib', 'seeds', 'companies.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = Company.new
  c.ticker = row["TICKER"]
  c.name = row["NAME"]
  c.save
end





demoUser = User.create!(username:"DemoUser", email:'demoUser@tikr.app', fname:'Demo', lname:'User', funds:100000, password: "password123")

demoCompany = Company.first

demoTransaction = Transaction.create!(order_type: true, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '01-06-1993', price: 50)
demoTransaction = Transaction.create!(order_type: true, quantity: 20, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '01-06-1993', price: 100 )
demoTransaction = Transaction.create!(order_type: true, quantity: 30, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '01-06-1993', price: 150 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '03-06-2001', price: 100 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id, transaction_time: '03-08-2006', price: 22 )
demoTransaction = Transaction.create!(order_type: true, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '03-08-2006', price: 20 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '03-08-2006', price: 50 )
demoTransaction = Transaction.create!(order_type: true, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '03-08-2006',price: 50 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '03-07-2012', price: 54 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '03-23-2016', price: 50 )
demoTransaction = Transaction.create!(order_type: false, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '11-07-2018', price: 36 )
demoTransaction = Transaction.create!(order_type: true, quantity: 10, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '10-03-2019', price: 150 )
demoTransaction = Transaction.create!(order_type: true, quantity: 20, company_id: demoCompany.id, user_id: demoUser.id,transaction_time: '10-03-2019', price: 25 )