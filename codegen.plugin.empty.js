module.exports = {
  plugin(schema, documents) {
    const typesMap = schema.getTypeMap()

    return Object.keys(typesMap)
      .filter((tm) => {
        return typesMap[tm].astNode?.kind && typesMap[tm].astNode?.fields
      })
      .map((tm) => {
        const fields = typesMap[tm].astNode?.fields
          ?.map((f) => `  ${f.name.value}: undefined,`)
          .join('\n')
        return `
export const ${typesMap[tm].name[0].toLowerCase() + typesMap[tm].name.substring(1, typesMap[tm].name.length)} = {
${fields}
}`
      })
      .join('\n')
  },
}
