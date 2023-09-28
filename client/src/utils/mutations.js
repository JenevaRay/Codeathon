import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REGISTRATION = gql`
  mutation AddRegistration($userId: String!, $eventId: String!, $type: String) {
    addRegistration(userId: $userId, eventId: $eventId, type: $type) {
      paid
      role
      _id
      eventId {
        _id
        feeRegistration
        registrationPaymentRequiredDate
      }
    }
  }
`;
