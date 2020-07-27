/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      type
      content
      createdAt
      updatedAt
      answer {
        id
        questionID
        content
        createdAt
        updatedAt
      }
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        content
        createdAt
        updatedAt
        answer {
          id
          questionID
          content
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const questionsByDate = /* GraphQL */ `
  query QuestionsByDate(
    $type: PostType
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    questionsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        content
        createdAt
        updatedAt
        answer {
          id
          questionID
          content
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $questionID: ID
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAnswers(
      questionID: $questionID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        questionID
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($questionID: ID!) {
    getAnswer(questionID: $questionID) {
      id
      questionID
      content
      createdAt
      updatedAt
    }
  }
`;
