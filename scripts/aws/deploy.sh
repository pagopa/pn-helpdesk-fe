#!/usr/bin/env bash
    
set -Eeuo pipefail
trap cleanup SIGINT SIGTERM ERR EXIT

cleanup() {
  trap - SIGINT SIGTERM ERR EXIT
  # script cleanup here
}

usage() {
      cat <<EOF
    Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-v] [-p <aws-profile>] -e <env-type>

    [-h]                      : this help message
    [-v]                      : verbose mode
    [-p <aws-profile>]        : aws cli profile (optional)
    -e <env-type>             : one of dev / uat / svil / coll / cert / prod
    
EOF
  exit 1
}

parse_params() {
  # default values of variables set from params
  aws_profile=""
  env_type=""

  while :; do
    case "${1-}" in
    -h | --help) usage ;;
    -v | --verbose) set -x ;;
    -p | --profile) 
      aws_profile="${2-}"
      shift
      ;;
    -e | --env-name) 
      env_type="${2-}"
      shift
      ;;
    -?*) die "Unknown option: $1" ;;
    *) break ;;
    esac
    shift
  done

  args=("$@")

  # check required params and arguments
  [[ -z "${env_type-}" ]] && usage 
  return 0
}

dump_params(){
  echo ""
  echo "######      PARAMETERS      ######"
  echo "##################################"
  echo "Env Name:          ${env_type}"
  echo "AWS profile:       ${aws_profile}"
}


# START SCRIPT

parse_params "$@"
dump_params


environment="${env_type}"
profile=${aws_profile}
profile_option="--profile ${profile}"
dest_dir='dist'
project_name="pn-logextractor-${environment}"
bucket_name="${project_name}-infra"
bucket_url="s3://${bucket_name}"
HelpdeskAccount=$(aws sts get-caller-identity --profile $profile | jq -r .Account)

source ./scripts/aws/environments/.env.${environment}

CognitoUserPoolId=$( aws ${profile_option} --region="eu-central-1" cloudformation describe-stacks \
      --stack-name "pn-logextractor-support-${environment}" | jq -r \
      ".Stacks[0].Outputs | .[] | select(.OutputKey==\"CognitoUserPoolId\") | .OutputValue" \
    )

CognitoWebClientId=$( aws ${profile_option} --region="eu-central-1" cloudformation describe-stacks \
      --stack-name "pn-logextractor-support-${environment}" | jq -r \
      ".Stacks[0].Outputs | .[] | select(.OutputKey==\"CognitoWebClientId\") | .OutputValue" \
    )

DistributionId=$( aws ${profile_option} --region="eu-central-1" cloudformation describe-stacks \
      --stack-name "pn-logextractor-${environment}" | jq -r \
      ".Stacks[0].Outputs | .[] | select(.OutputKey==\"CognitoUserPoolId\") | .OutputValue" \
    )

sed -e "s/\${USER_POOL_ID}/${CognitoUserPoolId}/" \
    -e "s/\${WEB_CLIENT_ID}/${CognitoWebClientId}/" \
    -e "s/\${DISTRIBUTION_ID}/${DistributionId}/"  .env.production

yarn build

cd build

aws s3 sync ${profile_option} --region eu-south-1 . s3://pn-logextractor-${environment}-hosting

aws cloudfront create-invalidation ${profile_option} --region eu-south-1 --distribution-id ${DISTRIBUTION_ID} --paths "/*"