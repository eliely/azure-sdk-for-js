// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, RestResponse } from "@azure/core-http";
import { CommunicationUser } from "@azure/communication-common";
import {
  CommunicationIdentityClient,
  TokenScope,
  IssueTokenResponse,
  CreateUserResponse
} from "../../src";
import {
  issueTokenHttpClient,
  createUserHttpClient,
  revokeTokensHttpClient
} from "./mockHttpClients";

export class TestCommunicationIdentityClient {
  private connectionString: string = "endpoint=https://contoso.spool.azure.local;accesskey=banana";

  public async issueTokenTest(
    user: CommunicationUser,
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<IssueTokenResponse> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: issueTokenHttpClient
    });
    return client.issueToken(user, scopes, options);
  }

  public async revokeTokensTest(
    user: CommunicationUser,
    revocationTime?: Date,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: revokeTokensHttpClient
    });
    return client.revokeTokens(user, revocationTime, options);
  }

  public async createUserTest(options: OperationOptions = {}): Promise<CreateUserResponse> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: createUserHttpClient
    });
    return client.createUser(options);
  }
}
