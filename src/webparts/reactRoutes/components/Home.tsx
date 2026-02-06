import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import { Link,useNavigate } from "react-router-dom";

const Home:React.FC<{}>=()=>{
    const navigate=useNavigate();

    return(
        <>
        <div style={{padding:30}}>
            <h2>Welcome to home page..</h2>
            <p>
                this is the homepage of your react routing example...
            </p>
            <nav style={{marginTop:20}}>
<Link
to="/form" style={{marginRight:20}}
>
Go to home page..

</Link>

<Link to ="about">Go to home page...</Link>
<PrimaryButton
onClick={()=>navigate("/form")}
style={{padding:"10 px 20px",marginTop:20}}
text="save"
/>
            </nav>

        </div>
        </>
    )
}
export default Home;