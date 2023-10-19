let userData = {};

//check local storage for token, see if user is logged in
function checkToken() {
    let result = false;
    let lsData = localStorage.getItem("Token");
    
    if(lsData && lsData != null){
        result = true;
    }
    return result;
}

const sendUserData = async (endpoint, passedInData) => {
    let result = await fetch(`http://localhost:5173/user/${endpoint}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(passedInData)
    });

    if(!result.ok){
        const message = `Error; try again ${result.status}`;
        throw new Error(message);
    }

    let data = await result.json();
    return data;
}

//const createAccount() = sendUserData(AddUsers, createdUser);
//const login() = sendUserData(Login, loginUser);

//let's see if this works with interpolating and interpolated URL...
const sendBlogData = async (endpoint) => {
    let result = await fetch(`http://localhost:5173/blog/${endpoint}`)
    let data = await result.json();
    return data;
};

//const GetBlogItems() = sendBlogData(GetBlogItem);
//const GetBlogItemsByUserId = sendBlogData(GetItemsByUserId/${UserId})

const GetLoggedInUser = async (username) => {
    let result = await fetch(`http://localhost:5173/user/GetUserByUsername/${username}`);
    userData = await result.json();
    console.log(userData);
}

const LoggedInData = () => {
    return userData;
}

const AddBlogItems = async (blogItems) => {
    let result = await fetch(`http://localhost:5173/blog/AddBlogItems`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(blogItems)
    });
    if(!result.ok){
        const message = `Error; try again ${result.status}`;
        throw new Error(message);
    }

    let data = await result.json();
    return data;
}

export { checkToken, sendUserData, sendBlogData, GetLoggedInUser, LoggedInData, AddBlogItems }