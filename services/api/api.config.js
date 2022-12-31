// export const API_URL = 'https://server.6figurespos.com/api/pos';
export const API_URL = 'http://54.254.223.13:8080/api/pos';
export const MICROSERVICE_API_URL = 'http://54.254.223.13:8080/api/pos/nail';
export const BRANCH_CODE = '3abe1bf2-3b51-4cb3-b034-000f3b43b9e6';
export const TENANT = 'TEXASNAILSBAR';

export const defaultHeader = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'branchCode': BRANCH_CODE,
    'tenant': TENANT,
};
