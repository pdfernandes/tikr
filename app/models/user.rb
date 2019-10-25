# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  fname           :string           not null
#  lname           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  funds           :float            default(0.0), not null
#

class User < ApplicationRecord 
    validates :username, :password_digest, :session_token, :email, :fname, :lname, presence: true
    validates :password, length: { minimum: 10, allow_nil: true}
    validates_uniqueness_of :session_token, :email
    after_initialize :ensure_session_token, :set_defaults

    attr_reader :password
    
    has_many :transactions,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Transaction

    has_many :companies,
    through: :transactions,
    source: :company

    has_many :watchlists,
    primary_key :id,
    foreign_key :user_id,
    class_name :Watchlist

    has_many :watched_companies,
    through :watchlists,
    source :company



    
   
    def set_defaults
        self.funds ||= 0.0
    end

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return user if user && user.is_password?(password)
        nil
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64(16)
    end

    def password=(password) 
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save!
        self.session_token
    end




end
