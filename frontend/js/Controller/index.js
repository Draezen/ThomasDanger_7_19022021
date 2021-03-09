class IndexController{
    constructor(request, view, user, sessionStorage, formValidator){
        this.request = request
        this.view = view
        this.user = user
        this.sessionStorage = sessionStorage
        this.formValidator = formValidator

        this.routeSignup = "http://localhost:3000/api/auth/signup"
        this.routeLogin =  "http://localhost:3000/api/auth/login"

        this.view.bindCheckFormLoginEmail(this.handleLoginEmail)
        this.view.bindCheckFormLoginPassword(this.handleLoginPassword)
        this.view.bindCheckFormSignupEmail(this.handleSignupEmail)
        this.view.bindCheckFormSignupPassword(this.handleSignupPassword)
        this.view.bindCheckFormSignupConfirmPassword(this.handleSignupConfirmPassword)

        this.view.bindFormLoginSubmit(this.login)
        this.view.bindFormSignupSubmit(this.signup)
    }

    login = (form) => {
        const user = this.user.login(form)
        const init = this.request.initPost(user)
        const login = this.request.request(this.routeLogin, init)

        const formValide = document.getElementsByClassName("login__input  valide") 

        if(formValide.length === 2){
            login.then(response => {
                if(response.name === "TypeError"){
                    this.view.errorMessage("#loginMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
                } else if(response.error){
                    this.view.errorMessage("#loginMessage", response.error)
                }else {
                    this.sessionStorage.create("token", response.token)
                    // window.location.href = "./home"
                }
           })
        }else {
            this.view.errorMessage("#loginMessage", "Formulaire non valide ! Vérifiez les informations entrées !")
        }
    }

    handleLoginEmail = (elt) => {
        const regex = /\b[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("loginEmail", valideInput, "#loginMessage")
    }
    
    handleLoginPassword = (elt) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^*\-+_/]).{8,}$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("loginPassword", valideInput,"#loginMessage")
    }
    signup = (form) => {
        const user = this.user.signup(form)
        const init = this.request.initPost(user)
        const signup = this.request.request(this.routeSignup, init)

        const formValide = document.getElementsByClassName("signup__input  valide") 

        if(formValide.length === 3){
            signup.then(response => {
                if(response.name === "TypeError"){
                    this.view.errorMessage("#signupMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
                } else if(response.error || response.errors){
                    this.view.errorMessage("#signupMessage", "Email invalide !")
                }else {
                    // window.location.href = "./home?" + paramètres
                }
                })
        } else {
            this.view.errorMessage("#signupMessage", "Formulaire non valide ! Vérifiez les informations entrées !")
        }
    }

    handleSignupEmail = (elt) => {
        const regex = /\b[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("signupEmail", valideInput, "#signupMessage")
    }
    
    handleSignupPassword = (elt) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^*\-+_/]).{8,}$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.emptyFormField("signupConfirmPassword")
        this.view.valideFormInput("signupPassword", valideInput,"#signupMessage")
    }

    handleSignupConfirmPassword = (elt) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^*\-+_/]).{8,}$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        if(valideInput){
            const validePassword = this.formValidator.checkConfirmPassword("signupConfirmPassword", "signupPassword")
            this.view.valideFormInput("signupConfirmPassword", validePassword,"#signupMessage")
        }else {
            this.view.valideFormInput("signupConfirmPassword", valideInput,"#signupMessage")
        }
  
    }

}

const indexPage = new IndexController(new Request(), new View(), new User(), new SessionStorage(), new FormValidator())