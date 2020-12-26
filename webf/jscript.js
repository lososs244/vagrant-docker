func1();
func2();
func4(4, 5, cb1, cb2);

class customError extends Error {
	constructor(status, message) {
		super(message);
		this.status = status;
	}
} 

function func1() {
	let text1 = document.getElementById('text1');
	let text2 = document.getElementById('menu');
	let text3 = document.getElementById('text3');
	let text4 = document.getElementById('Upper');
	let text5 = document.getElementById('Lower');
	let text6 = document.getElementById('text6');

	delay(5000)
		.then(function () { ChangeContent(text1, text2); return delay(5000); })
		.then(function () { ChangeContent(text2, text3); return delay(5000); })
		.then(function () { ChangeContent(text3, text4); return delay(5000); })
		.then(function () { ChangeContent(text4, text5); return delay(5000); })
		.then(function () { ChangeContent(text5, text6); return delay(5000); })
}

function delay(time) {
	return new Promise(function (resolve, reject) {
		setTimeout(resolve, time);
	});
}

function ChangeContent(str1, str2) {
	str1.textContent = str2.textContent;
}

function func2() {
	let colorArr = ['#99ff99', '#ffcc99', '#ff99ff', '#ccffff']
	let color = document.querySelector('.item3')
	let i = 0;

	setInterval(function () {
		if (i < colorArr.length) {
			color.style.backgroundColor = colorArr[i];
			i++;
		}
		else {
			i = 0;
			color.style.backgroundColor = colorArr[i];
			i++;
		}
	}, 5000);
}

function func2_1() {
	let block1 = document.querySelector('.item1');
	let block6 = document.querySelector('.item5');
	block1.style.backgroundColor = '#ff66ff';
	setTimeout(function () {
		[block1.style.backgroundColor, block6.style.backgroundColor] =
			[block6.style.backgroundColor, block1.style.backgroundColor];
	}, 5000);
}
function func3(profileName, repName) {
	let ul = document.getElementById('task3');
	let form = document.getElementById('ul1');
	fetch(`https://api.github.com/repos/${profileName}/${repName}/commits`)
		.then(res_status)
		.then(response => response.json())
		.then(function (data) {
			if (form.style.backgroundColor == 'red') {
				form.style.backgroundColor = 'transparent';
			}
			let i = 0;
			ul.innerHTML = '';
			while (i < data.length) {
				let li = document.createElement('li');
				li.textContent = `${data[i].commit.author.name}:  ${data[i].commit.message}`;
				ul.appendChild(li);
				i++;
			}
		})
		.catch(function (err) {
			ul.innerHTML = '';
			let li = document.createElement('li');
			li.textContent = `Error:  ${err.status} (${err.message})`;
			ul.appendChild(li);
			form.style.backgroundColor = 'red';
		});
}

function res_status(response) {
	if (response.ok) {
		return Promise.resolve(response)
	}
	else {
		return Promise.reject(new customError(response.status, response.statusText))
	}

}

function func4(num1, num2, callback1, callback2) {
	callback1(num1, num2);
	callback2(num1, num2);
}

function cb1(num1, num2) {
	console.log('First callback function start...');
	console.log('The sum is ' + (num1 + num2));
}

function cb2(num1, num2) {
	console.log('Second callback function start...');
	console.log('The result of multiplication is ' + (num1 * num2));
}

function func5(valueList) {
	let list = valueList.split(/\s/);
	list = Array.from(list);;
	for (let i = 0; i < list.length; i++) {
		list[i] = parseInt(list[i], 10);
		if (isNaN(list[i])) {
			list.splice(i, 1);
			i--;
		}
	}
	console.log(`\nQuicksort function starts...`);
	console.log(`Unsorted list: [${list}]`);
	list = quickSort(list);
	console.log(`Sorted list: [${list}]`);
}

function quickSort(arr) {
	if (arr.length < 2) return arr;
	let pivot = arr[0];
	let left = [];
	let right = [];

	for (let i = 1; i < arr.length; i++) {
		if (pivot > arr[i]) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat(pivot, quickSort(right));
}