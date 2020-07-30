class JsonWebToken
  def self.encode(payload)
    JWT.encode(payload, ENV.fetch("SECRET_KEY_BASE"))
  end

  def self.decode(token)
    body = JWT.decode(token, ENV.fetch("SECRET_KEY_BASE"))[0]
    HashWithIndifferentAccess.new body
  rescue
    return nil
  end
end
