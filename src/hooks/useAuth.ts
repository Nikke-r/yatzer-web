import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { SIGN_UP } from "../graphql/mutations";
import { CURRENT_USER, SIGN_IN } from "../graphql/queries";
import { SignUpValues, UserType } from "../types";
import useAppNotifications from "./useAppNotifications";
import { useApolloClient } from '@apollo/client';
import { USER_DATA_CHANGED } from "../graphql/subscriptions";

interface SignInQuery {
    signIn: UserType;
}

interface SignUpMutation {
    signUp: UserType;
}

interface CurrentUserQuery {
    currentUser: UserType;
}

const useAuth = () => {
    const client = useApolloClient();
    const history = useHistory();
    const { handleNotification, notification } = useAppNotifications();
    const [user, setUser] = useState<UserType>();
    const getCurrentUser = useQuery<CurrentUserQuery>(CURRENT_USER);
    const [signUp, signUpLoading] = useMutation<SignUpMutation>(SIGN_UP);
    const [signIn, signInLoading] = useLazyQuery<SignInQuery>(SIGN_IN, {
        onCompleted: data => {
            localStorage.setItem('token', data.signIn.token!);
            setUser(data.signIn);
            history.push('/');
        },
        onError: ({ graphQLErrors }) => console.log(graphQLErrors),
    });
    useSubscription(USER_DATA_CHANGED, { 
        variables: { id: user?.id},
        onSubscriptionData: ({ subscriptionData }) => {
            setUser(subscriptionData.data.userDataChanged)
        },
    });

    const handleSignUp = async (values: SignUpValues) => {
        try {
            const { data, errors } = await signUp({ variables: { username: values.username, password: values.password }});

            if (errors) {
                handleNotification(errors[0].message || 'Something went wrong', 5);
            }

            if (data && data.signUp) {
                signIn({ variables: { username: values.username, password: values.password }});
            }
        } catch (error) {
            handleNotification(error || 'Something went wrong', 5);
        }
    }

    const signOut = async () => {
        try {
            await client.resetStore();
            localStorage.removeItem('token');
            setUser(undefined);
            history.push('/');
        } catch (error) {
            handleNotification(error || 'Something went wrong', 5)
        }
    }

    useEffect(() => {
        if (getCurrentUser.data && getCurrentUser.data.currentUser) {
            setUser(getCurrentUser.data.currentUser);
        }
    }, [getCurrentUser]);

    return {
        user,
        signIn,
        handleSignUp,
        signOut,
        authError: notification,
        authLoading: getCurrentUser.loading || signUpLoading.loading || signInLoading.loading
    }
};

export default useAuth;