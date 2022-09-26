export type AmplifyDependentResourcesAttributes = {
    "api": {
        "voicebot": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "voicebotde2f84a5": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "predictions": {
        "Transcribe": {
            "region": "string",
            "language": "string"
        },
        "Polly": {
            "region": "string",
            "language": "string",
            "voice": "string"
        }
    }
}