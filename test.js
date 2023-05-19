// const students = [
//   { name: "Alice", age: 21, courses: ["Math", "Physics"] },
//   { name: "Bob", age: 19, courses: ["Computer Science"] },
//   { name: "Charlie", age: 20, courses: ["History", "Art"] },
// ]

// // Написати функцію sortStudentsByAge, яка приймає масив students і повертає масив їх імен, відсортований за віком у порядку зменшення.

// // Заборонено використовувати метод .sort(), рекурсії, цикл у циклі, більше одного явного виклику циклу (for, .foreach(), .map(), .reduce(), .filter(), etc).

// function sortStudentsByAge(students) {
//   const sorted = students
//     .reduce((sortedNames, student) => {
//       const { name, age } = student

//       const index = sortedNames.findIndex((sortedName) => age > sortedName.age)

//       if (index === -1) {
//         sortedNames.push({ name, age })
//       } else {
//         sortedNames.splice(index, 0, { name, age })
//       }

//       return sortedNames
//     }, [])
//     .map(({ name }) => name)
//   return sorted
// }

// console.log(sortStudentsByAge(students))

// // // Очікуваний результат
// // // [ 'Alice', 'Charlie', 'Bob' ]

// // //// // //// // //// // //// // //// // //// // //// // //

// const str = 'Hello team. Today I bought a lot of  :apple::apple::apple:' and I would like to share them with you.  <@Viktor/><@kate/>received:apple::apple::apple:, <@max/>:apple:<@Kate/>:apple:<@Max />:apple:<@Kate />:apple: <@viktor /><@Max /><@Kate /> also got rest:apple::apple:. <@Viktor /><@Kate /><@Max /> Thank you all. <@Max /> you are cool guy. <@Kate /> do not use :apple, apple, apple: and : apple :

// expected result
// {
//     viktor: 5,
//     kate: 7,
//     max: 4
// }

// // //// // //// // //// // //// // //// // //// // //// // //

function getNestedObject(keys, value) {
  // "value1.value2.value3.value4.value5"
  const keysAr = keys.split(".")

  const result = {}

  let curObj = result

  for (let i = 0; i < keysAr.length - 1; i++) {
    const key = keysAr[i]

    curObj[key] = {}

    curObj = curObj[key]
  }

  const lastKey = keysAr[keysAr.length - 1]

  // "Random string"

  curObj[lastKey] = value

  return result
}

const result = getNestedObject(
  "value1.value2.value3.value4.value5",
  "Random string"
)

console.log(result)

/* {
	value1: {
  	value2: {
    	value3: {
      	value4: {
        	value5: 'Random string',
        },
      },
    },
  },
} */
