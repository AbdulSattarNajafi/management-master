import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// documentation: https://docs.amplify.aws/javascript/tools/libraries/configure-categories/
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_j99Aij5GQ",
      userPoolClientId: "5cibloq2mppl76c0da0aniv0nk",
    },
  },
});

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      inputProps: { required: true },
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      inputProps: { type: "email", required: true },
    },
    password: {
      order: 3,
      placeholder: "Enter your password",
      label: "Password",
      inputProps: { type: "password", required: true },
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      inputProps: { type: "password", required: true },
    },
  },
};

// documentation: https://ui.docs.amplify.aws/react/connected-components/authenticator
const AuthProvider = ({ children }: any) => {
  return (
    <Authenticator formFields={formFields}>
      {({ user }) =>
        user ? (
          <div>{children}</div>
        ) : (
          <div>
            <h1>Please sign in below:</h1>
          </div>
        )
      }
    </Authenticator>
  );
};

export default AuthProvider;
