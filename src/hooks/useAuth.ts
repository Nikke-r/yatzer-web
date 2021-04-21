import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { SIGN_UP } from "../graphql/mutations";
import { CURRENT_USER, SIGN_IN } from "../graphql/queries";
import { USER_DATA_CHANGED } from "../graphql/subscriptions";
import { SignInValues, SignUpValues, UserType } from "../types";
import useAppNotifications from "./useAppNotifications";
import { useApolloClient } from '@apollo/client';

interface SignInType {
    signIn: UserType;
}

interface SignUpType {
    signUp: UserType;
}

interface CurrentUserType {
    currentUser: UserType;
}

const useAuth = () => {
    const { handleNotification, notification } = useAppNotifications();
    const [user, setUser] = useState<UserType>();
    const currentUser = useQuery<CurrentUserType>(CURRENT_USER, { onError: ({ graphQLErrors }) => handleNotification(graphQLErrors[0].message, 5)});
    const [signInQuery, signInResult] = useLazyQuery<SignInType>(SIGN_IN, { onError: ({ graphQLErrors }) => handleNotification(graphQLErrors[0].message, 5)});
    const [signUpMutation, signUpResult] = useMutation<SignUpType>(SIGN_UP, { onError: ({ graphQLErrors }) => handleNotification(graphQLErrors[0].message, 5)});
    useSubscription(USER_DATA_CHANGED, { variables: { username: user?.username }, onSubscriptionData: ({ subscriptionData }) => setUser(subscriptionData.data.userDataChanged)});
    const history = useHistory();
    const client = useApolloClient();

    const signUp = async (values: SignUpValues) => {
        try {
            const { data } = await signUpMutation({ variables: { username: values.username, password: values.password }});

            if (data && data.signUp) {
                signIn({ username: values.username, password: values.password });
            }
        } catch (error) {
            handleNotification(error.message, 5);
        }
    }

    const signIn = (values: SignInValues) => {
        signInQuery({ variables: values});
        history.push('/');
    };

    const signOut = async () => {
        try {
            setUser(undefined);
            localStorage.removeItem('token');
            await client.resetStore();
            history.push('/');
        } catch (error) {
            handleNotification(error.message, 5);
        }
    }

    useEffect(() => {
        if (currentUser.data) {
            setUser(currentUser.data.currentUser);
        }
    }, [currentUser]);

    useEffect(() => {
        if (signInResult.data) {
            setUser(signInResult.data.signIn);

            if (signInResult.data.signIn.token) {
                localStorage.setItem('token', signInResult.data.signIn.token);
            }
        }
    }, [signInResult]);

    return {
        signUp,
        signIn,
        signOut,
        user,
        authLoading: currentUser.loading || signInResult.loading || signUpResult.loading,
        authError: notification,
    };
};

export default useAuth;