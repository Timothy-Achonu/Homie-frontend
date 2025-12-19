'use client';

import { Typography } from '@/ui';
import clsx from 'clsx';
import OTPInput from 'react-otp-input';

const OTPInputField = ({
  otp,
  otpError,
  setOtp,
  setOtpError,
  disableInput,
  infoMsg,
}: {
  otp: string;
  setOtp: (value: string) => void;
  setOtpError: (value: string) => void;
  disableInput?: boolean;
  otpError?: string;
  infoMsg?: string;
}) => {
  return (
    <div className="flex flex-col gap-4 w-full items-center">

      <OTPInput
        containerStyle={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          gap: '1.25rem', 
        }} 
        value={otp}
        onChange={(val) => {
          setOtpError('');
          setOtp(val); 
        }}
        numInputs={5}
        renderInput={(props) => (
          <div className="relative">
            <input
              name="otp"
              {...props}  
              type="password"
              autoComplete="DO_NO_PREFILL"
              className={clsx(
                'min-h-20 min-w-14 rounded-[24px] shadow-input border-primary ring-primary outline-primary',
                !!otpError && 'border-error' 
              )}
              disabled={disableInput}
            />     
    
            {props.value && (
              <span
                className={clsx(
                  'absolute left-1/2 top-1/2 flex h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full',
                  !!otpError ? 'bg-error' : 'bg-primary-main'
                )}
              ></span>
            )}
          </div>
        )}
      />

      {otpError ? (
        <Typography color="error" variant="text-xs"  fontWeight="medium" align="center"> 
          {otpError}
        </Typography>
      ) : infoMsg ? (
        <Typography color="gray-500" variant="text-xs"  fontWeight="medium" align="center">
          {infoMsg}
        </Typography>
      ) : null}
    </div>
  );
};

export { OTPInputField };
