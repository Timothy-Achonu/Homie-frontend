import * as Yup from 'yup';

// Form validation schema
export const signupSchema = Yup.object({
  email: Yup.string().email().required('Email is required!'),
  fullName: Yup.string().required('Please enter your full name.'),
  password: Yup.string()
    .required('Please Enter a password.')
    .test(
      'passwordRequirements',
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character.',
      (value: string) => [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) => pattern.test(value))
    ),
  privacy: Yup.boolean().isTrue('Please accept the terms to continue.').required('Please accept the terms to continue.'),
});
  
// Form validation schema
export const signinSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required!'),
  password: Yup.string()
    .required('Please Enter a password.')
});

// Password reset req schema
export const passResetReqSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required!'),
});

// Reset password schema
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ' '], 'Passwords must match')
    .required('Confirm Password is required'),
});
