import Head from "next/head";

export default function OTPInput() {

    const userOtp = []
    const handleSubmit =()=>{

    }

  return (
    <>
    <Head>
        <link rel="stylesheet" href="../styles/style.css" />
    </Head>
      <div className="container">
      <form noValidate onSubmit={handleSubmit}>
        <div id="inputs" class="inputs">
          <input className="input" type="text" inputmode="numeric" maxlength="1" />
          <input className="input" type="text" inputmode="numeric" maxlength="1" />
          <input className="input" type="text" inputmode="numeric" maxlength="1" />
          <input className="input" type="text" inputmode="numeric" maxlength="1" />
          <input className="input" type="text" inputmode="numeric" maxlength="1" />
          <input className="input" type="text" inputmode="numeric" maxlength="1" />
          <input className="input" type="text" inputmode="numeric" maxlength="1" />
          <input className="input" type="text" inputmode="numeric" maxlength="1" />
        </div>
    </form>
      </div>
    </>
  );
}
