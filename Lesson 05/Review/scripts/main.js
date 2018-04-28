'use strict';

const userReviews = [];
const adminReviews = [];

function Review(review) {
	this.id = parseInt(review.id);
	this.submitTime = new Date(Date.parse(review.submitTime));
	this.userId = review.userId;
	this.comment = review.comment;
	this.status = parseInt(review.status);
	this.approveTime = new Date(Date.parse(review.approveTime));

	this.render = function ($parent, adminMode = true) {
		const bgColorStatus = ['reviewPending', 'reviewApproved'];
		const $wrapper = $('<div>', {
				class: `reviewWrapper ${adminMode ? bgColorStatus[this.status] : 'reviewUser'}`
			});
		let $buttonsWrapper;

		// Render review data for admin section.
		if (adminMode) {
			$wrapper.append($('<p>', {
					class: `reviewHeader`,
					html: `Review #${this.id}`
				}));
			
			$wrapper.append($('<p>', {
					class: `reviewHeader`,
					html: `Submited: ${this.submitTime.toLocaleString()}` +
						(this.status ? ' / Approved: ' +
						this.approveTime.toLocaleString() : '')
				}));

			$wrapper.append($('<p>', {
					class: `reviewHeaderUser`,
					html: this.userId
				}));

			$buttonsWrapper = $('<div>', {class: 'reviewButtonsWrapper'});

			if (!this.status) {
				$buttonsWrapper.append($('<button>', {
						reviewId: this.id,
						class: 'button buttonApprove',
						text: 'Approve'
					}));
			} else {
				$buttonsWrapper.append($('<button>', {
						reviewId: this.id,
						class: 'button buttonDisapprove',
						text: 'Disapprove'
					}));
			}

			$buttonsWrapper.append($('<button>', {
					reviewId: this.id,
					class: 'button buttonDelete',
					text: 'Delete'
				}));

			$wrapper
				.append($('<hr>'))
				.append($('<p>', {
					class: `reviewComment`,
					html: this.comment
				}))
				.append($('<hr>'))
				.append($buttonsWrapper)
		} else {
			// Render review data for user section.
			$wrapper.append($('<p>', {
					class: `reviewHeader`,
					html: `${this.submitTime.toLocaleString()} (<span class="reviewUserId">${this.userId})`
				}))
				.append($('<p>', {
					class: `reviewComment`,
					html: this.comment
				}));
		}

		$wrapper.appendTo($parent);
	}
}

function refreshReviews(sortUserReviews = false, sortAdminReviews = false) {
	const $userReviews = $('.userReviewsWrapper');
	const $adminReviews = $('.adminReviewsWrapper');

	$userReviews.html('');
	
	if (sortUserReviews) {
		userReviews.sort((a, b) => b.id - a.id);
	}
	
	userReviews.forEach((review) => review.render($userReviews, false));

	$adminReviews.html('');
	
	if (sortAdminReviews) {
		adminReviews.sort((a, b) => b.id - a.id);
	}
	
	adminReviews.forEach((review) => review.render($adminReviews));
	
	$('.buttonApprove').on('click', function () {
		const reviewId = parseInt($(this).attr('reviewid'));
		const i = adminReviews.findIndex((elem) => {
			return elem.id === reviewId;
		});
		
		adminReviews[i].status = 1;
		adminReviews[i].approveTime = new Date();

		userReviews.push(adminReviews[i]);

		refreshReviews(true);
	});
	
	$('.buttonDisapprove').on('click', function () {
		const reviewId = parseInt($(this).attr('reviewid'));
		const i = adminReviews.findIndex((elem) => {
			return elem.id === reviewId;
		});
		
		adminReviews[i].status = 0;
		delete adminReviews[i].approveTime;

		userReviews.splice(userReviews.findIndex((elem) => elem.id === reviewId), 1);

		refreshReviews();
	});
	
	$('.buttonDelete').on('click', function () {
		const reviewId = parseInt($(this).attr('reviewid'));
		const i = adminReviews.findIndex((elem) => {
			return elem.id === reviewId;
		});
		
		if (adminReviews[i].status) {
			const i = userReviews.findIndex((elem) => {
				return elem.id === reviewId;
			});
			
			userReviews.splice(i, 1);
		}
		
		adminReviews.splice(i, 1);
		refreshReviews();
	});
}

$.getJSON('scripts/review.list.json', (data) => {
	data.forEach((jsonReview) => {
		const review = new Review(jsonReview);

		if (review.status) {
			userReviews.push(review);
		}

		adminReviews.push(review);
	});
	
	refreshReviews(true, true);
});

$('#reviewSubmit').on('submit', (event) => {
	const $message = $('.userMessage');
	
	event.preventDefault();

	adminReviews.unshift(new Review({
		id: (adminReviews.length ? adminReviews[0].id + 1 : 1),
		submitTime: new Date(),
		userId: $('#userName').val().trim(),
		comment: $('#userReview').val().trim(),
		status: 0
	}));
	
	if ($message.data('intervalId')) {
		clearInterval($message.data('intervalId'));
		$message.data('intervalId', '');
	} else {
		$message.show();
	}
	
	$message.data('intervalId', setInterval(() => {
		if ($message.data('intervalId')) {
			clearInterval($message.data('intervalId'));
			$message.data('intervalId', '');
			$message.hide();
	}
	}, 3000));

	refreshReviews();
});

$('#userName, #userReview').on('blur', function() {
	this.value = this.value.trim();
});