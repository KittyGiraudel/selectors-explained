export default ast => {
  let id = 0
  let subject = ast.rule

  subject.__id = id++

  while (subject.rule && subject.rule.type === 'rule') {
    subject = subject.rule
    subject.__id = id++
  }

  return subject
}
