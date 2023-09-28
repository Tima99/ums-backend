function logout (req, res){
    res.clearCookie('jwt')
    res.json({message: "logout sucess"})
}

module.exports = logout