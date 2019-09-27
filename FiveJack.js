// ===== Tasks 1 ===== \\
chatRecord = record => {
  let answer = []
  let users = {}
  let logs = []
  const parseLog = log => {
    const verb = log.split(' ')
    return {
      action: verb[0],
      uid: verb[1],
      name: verb[2],
    }
  }

  record.forEach(log => {
    const logData = parseLog(log)
    logs.push(logData)
    users[logData.uid] = logData.name
  })
  logs.forEach(logData => {
    switch (logData.action) {
      case "Enter":
        answer.push({ uid: logData.uid, message: 'came in' })
        break
      case "Leave":
        answer.push({ uid: logData.uid, message: 'has left' })
        break

    }
  })
  answer = answer.map(log => `${users[log.uid]} ${log.message}`)
  console.log(users)
  console.log("record: ", record);
  console.log("answer: ", answer);
  return answer;
}
const record = [
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid1234",
  "Enter uid1234 Prodo",
  "Change uid4567 Ryan"
];
chatRecord(record);

// ===== Tasks 2 ===== \\
stageFailureRates = (N, users) => {
  let answer = []
  let failedRates = []
  for (let i = 1; i <= N; i++) {
    let stage = users.filter(user => user === i)
    let doneStage = users.filter(user => user >= i)
    failedRates.push({
      stage: i,
      failedRate: stage.length / doneStage.length
    })
  }
  failedRates.sort((a, b) => b.failedRate - a.failedRate)
  answer = failedRates.map(failedRate => failedRate.stage)

  console.log("users: ", users);
  console.log("answer: ", answer);

  return answer
}
stageFailureRates(5, [2, 1, 2, 6, 2, 4, 3, 3]);
stageFailureRates(4, [4, 4, 4, 4, 4]);

// ===== Tasks 3 ===== \\
solution = relation => {
  var answer = 0;
  let candidateKeys = []
  let duplicate = {}

  relation.forEach((tuples, tupleIndex, relation) => {

    tuples.forEach((field, fieldIndex) => {
      if (!duplicate[`${fieldIndex}`]) {
        relation.forEach((comparedTuple, comparedIndex) => {
          if (duplicate[`${fieldIndex}`]) return
          if (comparedIndex !== tupleIndex) {
            duplicate[`${fieldIndex}`] = comparedTuple[fieldIndex] === field
          }
        })
      } else if (!duplicate[`${fieldIndex}, ${fieldIndex + 1}`]) {
        relation.forEach((comparedTuple, comparedIndex) => {
          if (duplicate[`${fieldIndex}, ${fieldIndex + 1}`]) return
          if (comparedIndex !== tupleIndex) {
            let compared = `${comparedTuple[fieldIndex]}${comparedTuple[fieldIndex + 1]}`
            let current = `${field}${tuples[fieldIndex + 1]}`
            duplicate[`${fieldIndex}, ${fieldIndex + 1}`] = compared === current
          }
        })
      }
    })
  })

  candidateKeys = Object.keys(duplicate).filter(key => !duplicate[key])
  answer = candidateKeys.length
  return answer;
}

const relation = [
  ["100", "ryan", "music", "2"],
  ["200", "apeach", "math", "2"],
  ["300", "tube", "computer", "3"],
  ["400", "con", "computer", "4"],
  ["500", "muzi", "music", "3"],
  ["600", "apeach", "music", "2"]
];

console.log("answer", solution(relation));